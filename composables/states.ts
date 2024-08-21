export const sidebarVisibilityChanger = () => useState<boolean>("sidebarVisibility", () => false);

var currentUser = "Khai Minh Mai";

export const getCurrentUser = () => useState<string>("currentUser", () => currentUser);