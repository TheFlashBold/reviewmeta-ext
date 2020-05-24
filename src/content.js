const ASIN_REGEX = /\/([A-Z0-9]{10})(?:\/?|\?|$)/;
const $ = jQuery.noConflict();

(async () => {
    if (!ASIN_REGEX.test(window.location.href)) return;

    const infoElement = $("#averageCustomerReviews_feature_div");
    const [, asin] = window.location.href.match(ASIN_REGEX);

    const {
        notAnalyzed,
        score,
        reviews,
        reviewUrl,
    } = await browser.runtime.sendMessage({
        type: "getScore",
        asin,
    });

    if (notAnalyzed) {
        infoElement.html(`
            <span>
                not analyzed<br>
            </span>
        `);
    } else {
        infoElement.html(`
            <span>
                <i class="a-icon a-icon-star a-star-${score.toFixed(0)}"></i>
                Ø ${score.toFixed(2)} ✓ ${reviews}
                <a href="${reviewUrl}">review</a><br>
            </span>
        `);
    }
})();
