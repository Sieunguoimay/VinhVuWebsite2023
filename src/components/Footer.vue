<template>
    <div class="footer">
        <div class="upper">
            <div class="left">
            </div>
            <div class="middle">
            </div>
            <div class="right">
            </div>
        </div>
        <div class="lower">
        </div>
    </div>
</template>
<style scoped>
div {
    box-shadow: 0 0 0 1px #ff0000;
}

img {
    box-shadow: 0 0 0 1px #ff0000;
}

.footer {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    height: 200px;

    background-color: rgb(68, 80, 90);
}

.upper {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    height: 80%;
}

.upper div {
    flex: 1;
}
</style>
<script>
export default {

}
</script>