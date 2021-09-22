module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy("img");
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("js");
    eleventyConfig.addPassthroughCopy("data");

    
    eleventyConfig.addPassthroughCopy("favicon.ico");
    eleventyConfig.addPassthroughCopy("android-chrome-192x192.png");
    eleventyConfig.addPassthroughCopy("android-chrome-512x512.png");
    eleventyConfig.addPassthroughCopy("site.webmanifest");
    

    return {
        passthroughFileCopy: true,
        dir: {
            input: "views",
            output: "_site",
        },
        pathPrefix: "/ewd-2021/",
        htmlTemplateEngine: "liquid",
        markdownTemplateEngine: "liquid",
    }
};