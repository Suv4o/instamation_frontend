import { DocumentDuplicateIcon, HomeIcon } from "@heroicons/vue/24/outline";

const state = reactive({
    navigation: [
        { name: "Home", to: "/dashboard", icon: HomeIcon, current: false },
        { name: "Assets", to: "/dashboard/assets", icon: DocumentDuplicateIcon, current: false },
    ],
});
export default function useDashboardHeader() {
    function setNavigationCurrentItem(name: string) {
        state.navigation.forEach((item) => {
            if (item.name === name) {
                item.current = true;
            } else {
                item.current = false;
            }
        });
    }

    return {
        ...toRefs(state),
        setNavigationCurrentItem,
    };
}
