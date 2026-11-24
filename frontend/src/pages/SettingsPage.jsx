
import { Send, Check } from "lucide-react";

import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";

const PREVIEW_MESSAGES = [
  {
    id: 1,
    content: "Hey! How's it going?",
    isSent: false,
  },
  {
    id: 2,
    content: "I'm doing great! Just working on some new features.",
    isSent: true,
  },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <main className="min-h-screen bg-base-100 px-4 pb-10 pt-24">
      <div className="mx-auto w-full max-w-6xl space-y-8">

        {/* Page Heading */}
        <section className="space-y-1">
          <h1 className="text-2xl font-bold">
            Settings
          </h1>

          <p className="text-sm text-base-content/60">
            Customize the appearance of your chat application.
          </p>
        </section>

        {/* Theme Selection */}
        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">
              Choose a theme
            </h2>

            <p className="text-sm text-base-content/60">
              Select a theme that you like. Your choice will be saved
              automatically.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
            {THEMES.map((t) => {
              const isSelected = theme === t;

              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTheme(t)}
                  aria-label={`Select ${t} theme`}
                  aria-pressed={isSelected}
                  className={`
                    group relative flex min-w-0 flex-col items-center gap-2
                    rounded-xl border p-3 transition-all duration-200
                    ${
                      isSelected
                        ? "border-primary bg-base-200 ring-2 ring-primary/40"
                        : "border-base-300 hover:border-primary/50 hover:bg-base-200"
                    }
                  `}
                >
                  {/* Theme Color Preview */}
                  <div
                    data-theme={t}
                    className="w-full overflow-hidden rounded-lg border border-base-content/10"
                  >
                    <div className="grid h-10 grid-cols-4 gap-1 bg-base-100 p-1">
                      <div className="rounded bg-primary" />
                      <div className="rounded bg-secondary" />
                      <div className="rounded bg-accent" />
                      <div className="rounded bg-neutral" />
                    </div>
                  </div>

                  {/* Theme Name */}
                  <div className="flex w-full items-center justify-center gap-1">
                    <span className="truncate text-xs font-medium">
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </span>

                    {isSelected && (
                      <Check className="size-3 shrink-0 text-primary" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Theme Preview */}
        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">
              Preview
            </h2>

            <p className="text-sm text-base-content/60">
              This is how your chat interface will look with the selected theme.
            </p>
          </div>

          <div className="rounded-2xl border border-base-300 bg-base-200 p-4 shadow-sm sm:p-8">
            <div className="mx-auto w-full max-w-xl overflow-hidden rounded-xl border border-base-300 bg-base-100 shadow-lg">

              {/* Preview Chat Header */}
              <div className="flex items-center gap-3 border-b border-base-300 p-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-content">
                  J
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold">
                    John Doe
                  </h3>

                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-success" />

                    <p className="text-xs text-base-content/60">
                      Online
                    </p>
                  </div>
                </div>
              </div>

              {/* Preview Messages */}
              <div className="flex min-h-[230px] flex-col gap-5 overflow-y-auto bg-base-100 p-4 sm:p-5">
                {PREVIEW_MESSAGES.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.isSent
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`
                        max-w-[85%] rounded-2xl px-4 py-3 shadow-sm
                        ${
                          message.isSent
                            ? "rounded-br-sm bg-primary text-primary-content"
                            : "rounded-bl-sm bg-base-200 text-base-content"
                        }
                      `}
                    >
                      <p className="break-words text-sm leading-relaxed">
                        {message.content}
                      </p>

                      <p
                        className={`
                          mt-1.5 text-[10px]
                          ${
                            message.isSent
                              ? "text-primary-content/70"
                              : "text-base-content/50"
                          }
                        `}
                      >
                        12:00 PM
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Preview Input */}
              <div className="border-t border-base-300 bg-base-100 p-3 sm:p-4">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    className="input input-bordered input-sm min-w-0 flex-1 sm:input-md"
                    placeholder="Type a message..."
                    value="This is a preview"
                    readOnly
                  />

                  <button
                    type="button"
                    className="btn btn-primary btn-sm btn-square sm:btn-md"
                    aria-label="Preview send button"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
};

export default SettingsPage;
