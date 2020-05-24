browser.runtime.onMessage.addListener(function ({ type, ...data }) {
    switch (type) {
        case "getScore":
            return getScore(data);
    }
});

function getScore({ asin }) {
    return new Promise(async (resolve) => {
        const reviewUrl = `https://reviewmeta.com/amazon-de/${asin}`;
        const data = await $.get(reviewUrl);
        const doc = $(data);
        const notAnalyzed = $(".no_analysis_top", doc).length > 0;

        resolve({
            score: !notAnalyzed && parseFloat($("#adjusted-rating-large", doc).text()),
            reviews: !notAnalyzed && parseInt($('[itemprop="ratingCount"]', doc).text()),
            notAnalyzed,
            reviewUrl,
        });
    });
}
