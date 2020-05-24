const ASIN_REGEX = /\/?([A-Z0-9]{10})\/?/;
const $ = jQuery.noConflict();

(async () => {
    if (!ASIN_REGEX.test(window.location.href)) {
        console.log("lul?");
        return;
    }

    const asin = window.location.href.match(ASIN_REGEX)[1];
    const { notAnalyzed, score, reviews } = await browser.runtime.sendMessage({
        type: "getScore",
        asin,
    });
    if (notAnalyzed) {
        $('[data-feature-name="averageCustomerReviews"]').before(`
            <span>
                not analyzed<br>                    
            </span>
        `);
    } else {
        $('[data-feature-name="averageCustomerReviews"]').before(`
            <span>
                <i class="a-icon a-icon-star a-star-${score.toFixed(0)}"></i>
                Ø ${score.toFixed(2)} ✓ ${reviews}<br>                    
            </span>
        `);
    }
})();
