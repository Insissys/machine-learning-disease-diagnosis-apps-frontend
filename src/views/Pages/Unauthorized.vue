<template>
    <div class="flex items-center justify-center h-screen bg-gray-100">
        <div class="text-center p-6">
            <h1 class="text-4xl font-bold text-red-500 mb-4">403</h1>
            <h2 class="text-xl font-semibold mb-2">Unauthorized Access</h2>
            <p class="text-gray-600 mb-6">
                You don't have permission to view this page.
            </p>
            <RouterLink to="/" class="btn">
                Go Back to Dashboard
            </RouterLink>
        </div>
    </div>
</template>