
import { useEffect, useState } from "react";
import { Users } from "lucide-react";

import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

import SidebarSkeleton from "./skeletons/SidebarSkeleton";

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUsersLoading,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  const onlineCount = users.filter((user) =>
    onlineUsers.includes(user._id)
  ).length;

  if (isUsersLoading) {
    return <SidebarSkeleton />;
  }

  return (
    <aside className="flex h-full w-20 shrink-0 flex-col border-r border-base-300 transition-all duration-200 lg:w-72">

      {/* Sidebar Header */}
      <div className="w-full border-b border-base-300 p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6 shrink-0" />

          <span className="hidden font-semibold lg:block">
            Contacts
          </span>
        </div>

        <div className="mt-3 hidden items-center justify-between gap-2 lg:flex">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) =>
                setShowOnlineOnly(e.target.checked)
              }
              className="checkbox checkbox-sm"
            />

            <span className="text-sm">
              Show online only
            </span>
          </label>

          <span className="whitespace-nowrap text-xs text-base-content/60">
            {onlineCount} online
          </span>
        </div>
      </div>

      {/* Contacts */}
      <div className="w-full flex-1 overflow-y-auto py-3">
        {filteredUsers.map((user) => {
          const isOnline = onlineUsers.includes(user._id);
          const isSelected = selectedUser?._id === user._id;

          return (
            <button
              key={user._id}
              type="button"
              onClick={() => setSelectedUser(user)}
              className={`
                flex w-full items-center gap-3 p-3 transition-colors
                hover:bg-base-200
                ${
                  isSelected
                    ? "bg-base-200"
                    : ""
                }
              `}
            >
              <div className="relative mx-auto shrink-0 lg:mx-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="size-12 rounded-full border border-base-300 object-cover"
                />

                {isOnline && (
                  <span className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-base-100 bg-success" />
                )}
              </div>

              <div className="hidden min-w-0 flex-1 text-left lg:block">
                <div className="truncate font-medium">
                  {user.fullName}
                </div>

                <div className="text-sm text-base-content/60">
                  {isOnline ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          );
        })}

        {filteredUsers.length === 0 && (
          <div className="px-3 py-6 text-center text-sm text-base-content/60">
            {showOnlineOnly
              ? "No online users"
              : "No users found"}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
