<template>
    <div class="navbar shadow-sm bg-base-300">
        <div class="navbar-start">
            <label for="my-drawer-2" class="btn btn-ghost drawer-button">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
            </label>
        </div>
        <div class="navbar-center">
            <div class="text-xl text-primary font-bold">SympAI</div>
        </div>
        <div class="navbar-end">
            <!-- <img alt="Tailwind CSS Navbar component"src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" /> -->
            <div class="dropdown dropdown-end">
                <!-- <label tabindex="0" class="btn btn-circle avatar hidden md:flex">
                    <div class="w-9 rounded-full bg-primary">
                        <font-awesome-icon class="mt-2" :icon="['fas', 'user']" size="2x" />
                    </div>
                </label> -->

                <!-- <label tabindex="0" class="btn btn-square btn-ghost md:hidden">
                    <font-awesome-icon :icon="['fas', 'ellipsis']" />
                </label> -->

                <label tabindex="0" class="btn btn-square btn-ghost">
                    <font-awesome-icon :icon="['fas', 'ellipsis']" />
                </label>

                <ul tabindex="0" class="menu dropdown-content bg-base-200 z-[1] mt-3 w-52 p-2 shadow">
                    <li><a>Profil</a></li>
                    <li><a>Pengaturan</a></li>
                    <li><a>Keluar</a></li>
                </ul>
            </div>

        </div>
    </div>
</template>
