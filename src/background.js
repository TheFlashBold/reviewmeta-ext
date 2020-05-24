browser.runtime.onMessage.addListener(function ({ type, ...data }) {
    switch (type) {
        case "getScore":
            const { asin } = data;
            return new Promise((resolve) => {
                $.get(`https://reviewmeta.com/amazon-de/${asin}`, (data) => {
                    console.log(data);
                    const doc = $(data);
                    const score = parseFloat(
                        $("#adjusted-rating-large", doc).text()
                    );
                    const reviews = parseInt(
                        $('[itemprop="ratingCount"]', doc).text()
                    );
                    const notAnalyzed = $(".no_analysis_top", doc).length > 0;
                    const response = { score, reviews, asin, notAnalyzed };
                    console.log(response);
                    resolve(response);
                });
            });
            break;
    }
});
