
import { MessageCircle, Send, CheckCheck } from "lucide-react";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md w-full text-center">

        {/* Chat Preview */}
        <div className="relative bg-base-100 rounded-3xl shadow-xl p-6 mb-8">

          {/* Chat Header */}
          <div className="flex items-center gap-3 pb-5 border-b border-base-300">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold">
                JD
              </div>

              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-success rounded-full border-2 border-base-100" />
            </div>

            <div className="text-left flex-1">
              <h3 className="font-semibold">John Doe</h3>
              <p className="text-xs text-success">Online</p>
            </div>

            <MessageCircle className="w-6 h-6 text-primary" />
          </div>

          {/* Sample Messages */}
          <div className="py-6 space-y-5 text-sm">

            <div className="flex justify-start">
              <div className="bg-base-200 rounded-2xl rounded-bl-sm px-4 py-3 max-w-[80%] text-left">
                Hey! How&apos;s your day going?
              </div>
            </div>

            <div className="flex justify-end">
              <div className="bg-primary text-primary-content rounded-2xl rounded-br-sm px-4 py-3 max-w-[80%] text-left">
                Pretty good! Just working on something exciting.

                <div className="flex justify-end mt-2">
                  <CheckCheck className="w-4 h-4 opacity-70" />
                </div>
              </div>
            </div>

            <div className="flex justify-start">
              <div className="bg-base-200 rounded-2xl rounded-bl-sm px-4 py-3 max-w-[80%] text-left">
                That sounds great! 😊
              </div>
            </div>

          </div>

          {/* Message Input Preview */}
          <div className="flex items-center gap-3 bg-base-200 rounded-full px-4 py-3">
            <span className="text-base-content/50 text-xs flex-1 text-left">
              Type a message...
            </span>

            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Send className="w-4 h-4 text-primary-content" />
            </div>
          </div>

        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>

      </div>
    </div>
  );
};

export default AuthImagePattern;
