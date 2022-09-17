import avatar from "../../../assets/avatars/default-avatar.png";
import ava1 from "../../../assets/avatars/1.png";
import ava2 from "../../../assets/avatars/2.png";
import ava3 from "../../../assets/avatars/3.png";
import ava4 from "../../../assets/avatars/4.png";
import ava5 from "../../../assets/avatars/5.png";
import ava6 from "../../../assets/avatars/6.png";
import ava7 from "../../../assets/avatars/7.png";
import ava8 from "../../../assets/avatars/8.png";
import ava9 from "../../../assets/avatars/9.png";
import ava10 from "../../../assets/avatars/10.png";

export const getAvatarById = (id) =>{
    switch (id){
        case 1:{return ava1}
        case 2:{return ava2}
        case 3:{return ava3}
        case 4:{return ava4}
        case 5:{return ava5}
        case 6:{return ava6}
        case 7:{return ava7}
        case 8:{return ava8}
        case 9:{return ava9}
        case 10:{return ava10}
        default: return avatar
    }
}

