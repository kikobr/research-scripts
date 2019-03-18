module.exports = function(config) {
    config.addPassthroughCopy("./css");

    // eleventyConfig.addShortcode("getAllTags", function(all) {
    //     console.log(all);
    //     return [];
    // });

    config.addLiquidTag("tagsAsOptions", function(liquidEngine) {
        return {
            parse: function(tagToken, remainingTokens) {
                this.str = tagToken.args; // myVar or "alice"
            },
            render: function(scope, hash) {
                // Resolve variables
                var all = liquidEngine.evalValue(this.str, scope); // "alice"

                var tags = [];

                all.forEach((col)=>{
                    if(col.data && col.data.tags && col.data.tags.length){
                        col.data.tags.forEach((tag) => {
                            if(tags.indexOf(tag) == -1) tags.push(tag);
                        });
                    }
                });

                var options = "";
                tags.forEach((tag) => {
                    options += `<option value="${tag}">${tag}</option>`;
                });

                // Do the uppercasing
                return Promise.resolve(options);
                // return tags; // Promise.resolve(str.toUpperCase()); // "ALICE"
            }
        };
    });
}
