import {GiftList} from "./data/giftList";

function getGift(index) {
    if (index) {
        return GiftList[index];
    } else {
        return GiftList;
    }
}

export default getGift;
