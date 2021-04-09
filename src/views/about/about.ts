import {
    defineComponent,
    onMounted,
    ref,
    reactive,
    watchEffect,
    getCurrentInstance,
    computed,
} from "vue";

function name(str) {
    const userID = ref(str);
    return {
        userID,
    };
}

export default defineComponent({
    setup() {
        const age = ref(5);

        setTimeout(() => {
            age.value++;
        }, 3000);

        watchEffect(() => {
            console.log("watchEffect----start");
            console.log(age.value);
        });

        return {
            age,
            // ...name(age),
        };
    },
});


