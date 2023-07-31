<script setup lang="ts"></script>

<template>
    <div class="relative bg-white">
        <div class="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
            <div class="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
                <div class="mx-auto max-w-2xl lg:mx-0">
                    <div class="hidden sm:mt-32 sm:flex lg:mt-16"></div>
                    <h1 class="mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
                        An AI powered platform that automatically generates Instagram image descriptions
                    </h1>
                    <p class="mt-6 text-lg leading-8 text-gray-600">
                        This AI platform is designed to automatically generate image descriptions for Instagram posts.
                        Using image content as a basis, the tool can accurately and relevantly describe images without
                        requiring human input. Users can upload their images, schedule Instagram posts, and this tool
                        will generate descriptions, add hashtags, and manage the upload to their Instagram account. With
                        this platform, users can save time and effort in generating accurate and relevant image
                        descriptions.
                    </p>
                    <div class="mt-10 flex items-center gap-x-6 relative z-10">
                        <a
                            href="#sign-in-form"
                            class="rounded-md bg-cyan-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                            >Get started</a
                        >
                    </div>
                </div>
            </div>
            <div class="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
                <nuxt-img
                    class="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
                    src="/images/hero-image.jpg"
                    alt="hero image, with an interesting building with different colours"
                />
            </div>
        </div>
    </div>
</template>
