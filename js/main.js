const intersectionObserver = () => {
    const kv = document.querySelector(".js-kv"); //監視対象
    const header = document.querySelector(".js-header");

    //headerを見せるアニメーション関数
    const showHeader = () => {
        gsap.fromTo(
            header,
            {
                transform: "translateY(-100%)",
            },
            {
                transform: "translateY(0)",
                duration: 0.3,
                ease: "linear",
            }
        );
    };

    //header閉じるアニメーション関数
    const hideHeader = () => {
        gsap.fromTo(
            header,
            {
                transform: "translateY(0)",
            },
            {
                transform: "translateY(-100%)",
                duration: 0.3,
                ease: "linear",
                onComplete: () => {
                    header.classList.remove("fixed");
                    gsap.set(header, { transform: "translateY(0)" });
                },
            }
        );
    };

    if (!kv || !header) return;

    const handleIntersection = (entries) => {
        entries.forEach((entry) => {
            // kv がvp内に入り、かつheaderがfixedを保有している場合
            if (entry.isIntersecting && header.classList.contains("fixed")) {
                //header閉じるアニメーション開始
                hideHeader();
            } else if (!entry.isIntersecting) {
                //headerを固定表示するためにfixed追加
                header.classList.add("fixed");
                //ヘッダー表示アニメーション開始
                showHeader();
            }
        });
    };

    const options = {
        threshold: 0,
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    //監視対象を監視
    observer.observe(kv);
};

intersectionObserver();
