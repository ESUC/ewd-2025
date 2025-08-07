module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy("img");
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("js");
    eleventyConfig.addPassthroughCopy("data");

    
    eleventyConfig.addPassthroughCopy("favicon.ico");
    eleventyConfig.addPassthroughCopy("android-chrome-192x192.png");
    eleventyConfig.addPassthroughCopy("android-chrome-512x512.png");
    eleventyConfig.addPassthroughCopy("site.webmanifest");
    eleventyConfig.setLiquidOptions({
        dynamicPartials: false,
        strictFilters: false,
    });

    return {
        passthroughFileCopy: true,
        dir: {
            input: "views",
            output: "_site",
            includes: "_includes"
        },
        pathPrefix: "/ewd-2025/",
        htmlTemplateEngine: "liquid",
        markdownTemplateEngine: "liquid",
    }
};
