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
        resolve({
            score: parseFloat($("#adjusted-rating-large", doc).text()),
            reviews: parseInt($('[itemprop="ratingCount"]', doc).text()),
            notAnalyzed: $(".no_analysis_top", doc).length > 0,
        });
    });
}
