import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Message, Attachment } from '../types';
import { useConfig } from './ConfigContext';
import { users } from '../data/mock';
import musicsData from '../data/musics.json';

interface ChatState {
  messages: Message[];
  sendMessage: (content: string) => Promise<void>;
}

const ChatContext = createContext<ChatState | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

const SYSTEM_USER = users['system'];

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { baseUrl, apiKey, model, neteaseBaseUrl } = useConfig();
  const [musicList, setMusicList] = useState<string>('');
  const [storyContext, setStoryContext] = useState<string>('');
  const [characterContext, setCharacterContext] = useState<string>('');

  useEffect(() => {
    Promise.all([
      fetch('/prompts/25.md').then((res) => res.text()),
      fetch('/prompts/characters.md').then((res) => res.text()),
    ])
      .then(([storyText, characterText]) => {
        const formattedMusicList = musicsData
          .map(
            (song: { name: string; id: number }) =>
              `| ${song.name} | ${song.id} |`
          )
          .join('\n');
        setMusicList(
          `| Song Name | ID |\n| --- | --- |\n${formattedMusicList}`
        );
        setStoryContext(storyText);
        setCharacterContext(characterText);
      })
      .catch((err) => console.error('Failed to load prompts:', err));
  }, []);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    // 1. Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      userId: 'me', // The current user ID
      content,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setMessages((prev) => [...prev, userMsg]);

    // 2. Prepare API Call

    try {
      if (!baseUrl || !apiKey) {
        throw new Error('Please configure AI settings in the "Me" menu.');
      }

      // Construct the conversation history for the AI
      // We limit context to last 10 messages to save tokens/complexity
      const contextMessages = messages.slice(-10).map((m) => ({
        role: m.userId === 'me' ? 'user' : 'assistant',
        content: m.content || '[Attachment]',
      }));

      contextMessages.push({ role: 'user', content });

      const payload = {
        model: model || 'gpt-3.5-turbo', // Default if not set
        messages: [
          ...contextMessages,
          {
            role: 'system',
            content: `You are in a chat application styled like "Nightcord at 25:00". You have access to characters from the Project SEKAI universe who can respond to the user's message.

${storyContext}

${characterContext}

The main characters for this chat are from the 25時 group:
- K (宵崎 奏): ID 'k'
- 雪 (朝比奈 まふゆ): ID 'yuki'
- えななん (东云 绘名): ID 'enanan'
- Amia (晓山 瑞希): ID 'amia'

## Available Songs
${musicList}

Respond in JSON format with an array of messages like this:
[
  {
    "userId": "k|yuki|enanan|amia",
    "type": "text",
    "content": "Message content here"
  },
  {
    "userId": "k|yuki|enanan|amia",
    "type": "audio",
    "content": "Song ID here"
  }
]

## IMPORTANT

Always answer in Simplified Chinese.

You can choose to have one or multiple characters respond. The user's message is: "${content}"`,
          },
        ],
      };

      const endpoint = baseUrl.endsWith('/')
        ? `${baseUrl}chat/completions`
        : `${baseUrl}/chat/completions`;

      // Log the request payload
      console.log('[AI API Request]', payload.messages);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      // Log the full response
      console.log('[AI API Response]', data.choices?.[0]?.message?.content);
      const aiContent = data.choices?.[0]?.message?.content || '(No response)';

      // Add a small delay to make the response feel more natural
      // await new Promise((resolve) =>
      //   setTimeout(resolve, 1000 + Math.random() * 2000)
      // ); // 1-3 seconds delay

      try {
        // Attempt to parse the AI's response as JSON for character selection
        // Remove any markdown code block markers
        const cleanContent = aiContent
          .replace(/^```json\n?/i, '')
          .replace(/```$/g, '')
          .trim();

        const parsedResponse = JSON.parse(cleanContent);

        // Check if the response is an array of messages
        if (Array.isArray(parsedResponse)) {
          // Add messages from each selected character sequentially with delay
          for (const msg of parsedResponse) {
            if (msg.userId) {
              let attachment: Attachment | undefined;
              let finalContent = msg.content;

              if (msg.type === 'audio' && msg.content && neteaseBaseUrl) {
                const songId = msg.content;
                finalContent = ''; // Clear content so ID doesn't show

                try {
                  const urlRes = await fetch(
                    `${neteaseBaseUrl}/song/url?id=${songId}&randomCNIP=true`
                  );
                  const urlData = await urlRes.json();
                  const songUrl = urlData.data?.[0]?.url;

                  const detailRes = await fetch(
                    `${neteaseBaseUrl}/song/detail?ids=${songId}&randomCNIP=true`
                  );
                  const detailData = await detailRes.json();
                  const song = detailData.songs?.[0];

                  if (songUrl && song) {
                    attachment = {
                      id: songId,
                      type: 'audio',
                      name: song.name,
                      size: 'Unknown',
                      url: songUrl,
                    };

                    if (urlData.data?.[0]?.size) {
                      const sizeInMB = (
                        urlData.data[0].size /
                        (1024 * 1024)
                      ).toFixed(2);
                      attachment.size = `${sizeInMB} MB`;
                    }
                  }
                } catch (err) {
                  console.error('Failed to fetch song info:', err);
                }
              }

              if (finalContent || attachment) {
                // Add message
                setMessages((prev) => [
                  ...prev,
                  {
                    id: (Date.now() + prev.length + 1).toString(),
                    userId: msg.userId,
                    content: finalContent,
                    attachment,
                    timestamp: new Date().toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    }),
                  },
                ]);
              }

              // Wait for a random delay between messages (1-3 seconds)
              await new Promise((resolve) =>
                setTimeout(resolve, 1000 + Math.random() * 2000)
              );
            }
          }
        } else {
          // If not an array, treat as a single response from system
          const fallbackMsg: Message = {
            id: (Date.now() + 1).toString(),
            userId: SYSTEM_USER.id,
            content: aiContent,
            timestamp: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          };
          setMessages((prev) => [...prev, fallbackMsg]);
        }
      } catch (e) {
        // If parsing fails, add the raw response as a fallback
        console.error('Failed to parse AI response as JSON:', e);
        const fallbackMsg: Message = {
          id: (Date.now() + 1).toString(),
          userId: SYSTEM_USER.id,
          content: `System: ${aiContent}`,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };
        setMessages((prev) => [...prev, fallbackMsg]);
      }
    } catch (error: unknown) {
      console.error('AI Chat Error:', error);
      // Optional: Add an error system message
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to connect to AI.';
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        userId: SYSTEM_USER.id,
        content: `Error: ${errorMessage}`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};
