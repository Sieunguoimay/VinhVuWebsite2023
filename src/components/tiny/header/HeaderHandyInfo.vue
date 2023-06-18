<template>
    <div class="header-handy-info">
        <span>Hotline: 123</span>
        <span>Email: ABC@abcd.com</span>
        <span>Nothing</span>
    </div>
</template>
<style scoped>
.header-handy-info {
    color: rgb(127, 141, 152);
    display: flex;
    flex-direction: row;
    justify-content: end;
    padding-top: 2px;
    gap:10px;
    font-size: small;
}

 .header-handy-info span{
    /* flex-grow: 1;
    text-align: center; */
}
.header-handy-info>*:not(:last-child) {
    /* border-right: 1px solid black; */
    /* padding-right: 10px; */
    /* Optional: Add some spacing between the elements */
}

/* .header-handy-info>*:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-80%);
    height: 50%;
    border-right: 1px solid rgb(194, 194, 194);
} */
</style>