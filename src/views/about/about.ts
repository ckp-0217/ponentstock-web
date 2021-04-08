import {
    defineComponent,
    onMounted,
    ref,
    reactive,
    watchEffect,
    getCurrentInstance,
} from "vue";


export function name(str) {
    const userID = ref(str);
    userID.value += '3333333';
    return {
        userID,
    };
}