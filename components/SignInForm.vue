<script setup lang="ts">
const { $auth } = useNuxtApp();

async function signIn(e: Event) {
    e.preventDefault();
    $auth.loginWithRedirect();
}
</script>

<template>
    <div class="bg-gray-900" id="sign-in-form">
        <div class="relative isolate px-6 pt-14 lg:px-8">
            <div
                class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true"
            >
                <div
                    class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#06b6d4] to-[#082f49] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style="
                        clip-path: polygon(
                            74.1% 44.1%,
                            100% 61.6%,
                            97.5% 26.9%,
                            85.5% 0.1%,
                            80.7% 2%,
                            72.5% 32.5%,
                            60.2% 62.4%,
                            52.4% 68.1%,
                            47.5% 58.3%,
                            45.2% 34.5%,
                            27.5% 76.7%,
                            0.1% 64.9%,
                            17.9% 100%,
                            27.6% 76.8%,
                            76.1% 97.7%,
                            74.1% 44.1%
                        );
                    "
                />
            </div>
            <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <div class="hidden sm:mb-8 sm:flex sm:justify-center"></div>
                <form @submit="signIn" class="text-center">
                    <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-8">
                        Sign in to your account for free
                    </h1>
                    <div class="mt-10 flex items-center justify-center gap-x-6">
                        <button
                            type="submit"
                            class="flex w-full justify-center rounded-md bg-cyan-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
            <div
                class="absolute inset-x-0 top-[calc(100%-25rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-50rem)]"
                aria-hidden="true"
            >
                <div
                    class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#06b6d4] to-[#082f49] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    style="
                        clip-path: polygon(
                            74.1% 44.1%,
                            100% 61.6%,
                            97.5% 26.9%,
                            85.5% 0.1%,
                            80.7% 2%,
                            72.5% 32.5%,
                            60.2% 62.4%,
                            52.4% 68.1%,
                            47.5% 58.3%,
                            45.2% 34.5%,
                            27.5% 76.7%,
                            0.1% 64.9%,
                            17.9% 100%,
                            27.6% 76.8%,
                            76.1% 97.7%,
                            74.1% 44.1%
                        );
                    "
                />
            </div>
        </div>
    </div>
</template>
