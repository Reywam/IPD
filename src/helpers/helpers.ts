export const isTokenValid = (token: string): boolean => {
    if (!token) {
        return false;
    }
    return token.length === 300;
};

export const formatDate = (created: string): string => {
    const timestamp = Number(created);
    const date = new Date(timestamp);
    const locale = "ru";
    const month = date.toLocaleString(locale, {
        month: "short",
    });
    const time = date.toLocaleTimeString(locale, {
        hour: "numeric",
        minute: "numeric",
        hour12: false
    });

    return `${date.getDate()} ${month} ${date.getFullYear()} в ${time}`;
};

export const getTranslateRoleName = (englishName: string): string => {
    let role = "";
    switch (englishName) {
        case "admin": {
            role = "Админ";
            break;
        }
        case "author": {
            role = "Автор";
            break;
        }
        case "user": {
            role = "Обычный пользователь";
            break;
        }
        default: {
            role = "Обычный пользователь";
            break;
        }
    }
    return role;
};
