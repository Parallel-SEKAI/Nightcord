import React from 'react';
import { X, Save } from 'lucide-react';
import { useConfig } from '../../context/ConfigContext';
import { useTranslation } from 'react-i18next';

export const SettingsModal: React.FC = () => {
  const {
    isSettingsOpen,
    closeSettings,
    baseUrl,
    setBaseUrl,
    apiKey,
    setApiKey,
    model,
    setModel,
    neteaseBaseUrl,
    setNeteaseBaseUrl,
  } = useConfig();
  const { t, i18n } = useTranslation();

  if (!isSettingsOpen) return null;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-[400px] bg-nc-bg-main border border-nc-separator rounded-lg shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={closeSettings}
          className="absolute top-4 right-4 text-nc-text-secondary hover:text-nc-text-primary transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-nc-text-primary mb-6">
          {t('settings.title')}
        </h2>

        <div className="space-y-6">
          {/* General Configuration */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-nc-text-secondary uppercase">
                {t('settings.language')}
              </label>
              <select
                value={i18n.language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="w-full bg-nc-bg-input text-nc-text-primary p-2.5 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
              >
                <option value="en">English</option>
                <option value="ja">日本語</option>
                <option value="zh-CN">简体中文</option>
                <option value="zh-TW">繁體中文</option>
              </select>
            </div>
          </div>

          {/* AI Configuration */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-nc-text-primary border-b border-nc-separator pb-2">
              {t('settings.aiConfig')}
            </h3>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-nc-text-secondary uppercase">
                {t('settings.baseUrl')}
              </label>
              <input
                type="text"
                value={baseUrl}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setBaseUrl(e.target.value)
                }
                placeholder="https://api.openai.com/v1"
                className="w-full bg-nc-bg-input text-nc-text-primary p-2.5 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-nc-text-secondary uppercase">
                {t('settings.apiKey')}
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setApiKey(e.target.value)
                }
                placeholder="sk-..."
                className="w-full bg-nc-bg-input text-nc-text-primary p-2.5 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-nc-text-secondary uppercase">
                {t('settings.model')}
              </label>
              <input
                type="text"
                value={model}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setModel(e.target.value)
                }
                placeholder="gpt-3.5-turbo"
                className="w-full bg-nc-bg-input text-nc-text-primary p-2.5 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
              />
            </div>
          </div>

          {/* Music Configuration */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-nc-text-primary border-b border-nc-separator pb-2">
              {t('settings.musicConfig')}
            </h3>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-nc-text-secondary uppercase">
                {t('settings.neteaseBaseUrl')}
              </label>
              <input
                type="text"
                value={neteaseBaseUrl}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNeteaseBaseUrl(e.target.value)
                }
                placeholder="https://netease.api.parallel-sekai.org"
                className="w-full bg-nc-bg-input text-nc-text-primary p-2.5 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={closeSettings}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            <Save size={16} />
            {t('settings.done')}
          </button>
        </div>
      </div>
    </div>
  );
};
