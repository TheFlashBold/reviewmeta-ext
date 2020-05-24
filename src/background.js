browser.runtime.onMessage.addListener(function ({ type, ...data }) {
    switch (type) {
        case "getScore":
            return getScore(data);
    }
});

function getScore({ asin }) {
    return new Promise(async (resolve) => {
        const data = await $.get(`https://reviewmeta.com/amazon-de/${asin}`);
        const doc = $(data);
        const score = parseFloat($("#adjusted-rating-large", doc).text());
        const reviews = parseInt($('[itemprop="ratingCount"]', doc).text());
        const notAnalyzed = $(".no_analysis_top", doc).length > 0;
        resolve({ score, reviews, asin, notAnalyzed });
    });
}
