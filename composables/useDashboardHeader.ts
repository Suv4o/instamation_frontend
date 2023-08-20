import { CalendarIcon, DocumentDuplicateIcon, HomeIcon, Cog8ToothIcon } from "@heroicons/vue/24/outline";

const state = reactive({
    navigation: [
        { name: "Home", to: "/dashboard", icon: HomeIcon, current: false },
        { name: "Scheduler", to: "/dashboard/scheduler", icon: CalendarIcon, current: false },
        { name: "Assets", to: "/dashboard/assets", icon: DocumentDuplicateIcon, current: false },
        { name: "Settings", to: "/dashboard/settings", icon: Cog8ToothIcon, current: false },
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
