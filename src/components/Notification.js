import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

toast.configure(1000);

const notify = (message) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export default notify;
