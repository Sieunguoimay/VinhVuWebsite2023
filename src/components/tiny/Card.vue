<template>
    <article class="card" @click="navigateTo(card.page_path)">
        <div class="article-wrapper">
            <figure>
                <img :src="card.img" alt="Card Image" class="card-image" />
            </figure>
            <div class="article-body">
                <h2>{{ card.title.toUpperCase() }}</h2>
                <p>
                    {{ card.preview_content }}
                </p>
                <router-link :to="card.page_path" class="read-more">
                    Đọc tiếp <span class="sr-only">about this is some title</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                            clip-rule="evenodd" />
                    </svg>
                </router-link>
            </div>
        </div>
    </article>
</template>
<script>
export default {
    props: {
        card: {
            page_path:"",
            title:"",
            img:"",
            preview_content:"",
        },
    },
    methods: {
        navigateTo(link) {
            this.$router.push(link);
        },
    }
}
</script>


<style scoped>
article {
    --img-scale: 1.001;
    --title-color: black;
    --link-icon-translate: -20px;
    --link-icon-opacity: 0;
    position: relative;
    border-radius: 16px;
    box-shadow: none;
    background: #fff;
    transform-origin: center;
    transition: all 0.4s ease-in-out;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 1px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
    cursor: pointer;
}

article a::after {
    position: absolute;
    inset-block: 0;
    inset-inline: 0;
    cursor: pointer;
    content: "";
}

/* basic article elements styling */
article h2 {
    margin: 0 0 18px 0;
    font-size: 1.9rem;
    color: var(--title-color);
    transition: color 0.3s ease-out;
}

figure {
    margin: 0;
    padding: 0;
    aspect-ratio: 16 / 9;
    overflow: hidden;
}

article img {
    max-width: 100%;
    transform-origin: center;
    transform: scale(var(--img-scale));
    transition: transform 0.4s ease-in-out;
}

.article-body {
    padding: 24px;
}

article a {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    color: #379237;
}

article a:focus {
    outline: 1px dotted #379237;
}

article a .icon {
    min-width: 24px;
    width: 24px;
    height: 24px;
    margin-left: 5px;
    transform: translateX(var(--link-icon-translate));
    opacity: var(--link-icon-opacity);
    transition: all 0.3s;
}

article:has(:hover, :focus) {
    --img-scale: 1.1;
    --title-color: #379237;
    --link-icon-translate: 0;
    --link-icon-opacity: 1;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}



*,
*::before,
*::after {
    box-sizing: border-box;
}


@media screen and (max-width: 960px) {
    article {
        container: card/inline-size;
    }

    .article-body p {
        display: none;
    }
}

@container card (min-width: 380px) {
    .article-wrapper {
        display: grid;
        grid-template-columns: 100px 1fr;
        gap: 16px;
    }

    .article-body {
        padding-left: 0;
    }

    figure {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    figure img {
        height: 100%;
        aspect-ratio: 1;
        object-fit: cover;
    }
}

.sr-only:not(:focus):not(:active) {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
}
</style>