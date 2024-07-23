import {create} from "zustand"

export type ModalType = "createServer" | 'invite'

interface ModalData {
    server? : String
}

interface ModalStore {
    type : ModalType | null;
    isOpen : boolean;
    data : ModalData;
    onOpen : (type : ModalType , data ? : ModalData) => void
    onClose : () => void 
}

export const useModal = create<ModalStore>((set)=>({
    type : null,
    data: {},
    isOpen : false,
    onOpen : (type, data= {} ) => set({isOpen : true , type , data}),
    onClose : () => set({type : null , isOpen : false})
}))
// import {configureStore } from "@reduxjs/toolkit"
// import modalReducer from "./features/modal-features/modalSlice"
// export const modalStore = configureStore({
//     reducer : {
//         modalReducer
//     }
// })