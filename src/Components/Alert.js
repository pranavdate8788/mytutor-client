import { notification } from "antd";



export const useAlert = () => {
    const [api, contextHolder] = notification.useNotification();
    notification.config({
        duration: 0,
    })

    const showNotification = (e, descp = "Refresh page to see updated changes") => {
        api.info({
            message: ` ${e}`,
            description: descp,
            e,
        });
    };

    return [showNotification, contextHolder];
}
