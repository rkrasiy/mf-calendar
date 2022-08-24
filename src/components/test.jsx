import React from "react";
import "./scroll-styles.css";
class HorScroll extends React.Component {
	items = Array.from({ length: 75 }, (_, i) => (
		<span key={i} className="pn-ProductNav_Link">{`Item ${i + 1}`}</span>
	));
	componentDidMount() {
		console.log(this.el);
		//setTimeout(()=>{
		console.log(this.el.querySelectorAll(".pn-ProductNav_Link").length);
		//},100)

		window.dragscroll.reset();
		let SETTINGS = {
			navBarTravelling: false,
			navBarTravelDirection: "",
			navBarTravelDistance: 400
		};

		// Out advancer buttons
		let pnAdvancerLeft = document.getElementById("pnAdvancerLeft");
		let pnAdvancerRight = document.getElementById("pnAdvancerRight");
		
        // the indicator
		let pnIndicator = document.getElementById("pnIndicator");

		let pnProductNav = document.getElementById("pnProductNav");
		let pnProductNavContents = document.getElementById("pnProductNavContents");

		pnProductNav.setAttribute(
			"data-overflowing",
			determineOverflow(pnProductNavContents, pnProductNav)
		);

		// Set the indicator
		//moveIndicator(pnProductNav.querySelector("[aria-selected=\"true\"]"), colours[0]);

		// Handle the scroll of the horizontal container
		let last_known_scroll_position = 0;
		let ticking = false;

		function doSomething(scroll_pos) {
			pnProductNav.setAttribute(
				"data-overflowing",
				determineOverflow(pnProductNavContents, pnProductNav)
			);
		}

		pnProductNav.addEventListener("scroll", function() {
			last_known_scroll_position = window.scrollY;
			if (!ticking) {
				window.requestAnimationFrame(function() {
					doSomething(last_known_scroll_position);
					ticking = false;
				});
			}
			ticking = true;
		});

		pnAdvancerLeft.addEventListener("click", function() {
			// If in the middle of a move return
			if (SETTINGS.navBarTravelling === true) return;

			// If we have content overflowing both sides or on the left
			if (
				determineOverflow(pnProductNavContents, pnProductNav) === "left" ||
				determineOverflow(pnProductNavContents, pnProductNav) === "both"
			) {
				// Find how far this panel has been scrolled
				const availableScrollLeft = pnProductNav.scrollLeft;
				// If the space available is less than two lots of our desired distance, just move the whole amount
				// otherwise, move by the amount in the settings
				if (availableScrollLeft < SETTINGS.navBarTravelDistance * 2) {
					pnProductNavContents.style.transform =
						"translateX(" + availableScrollLeft + "px)";
				} else {
					pnProductNavContents.style.transform =
						"translateX(" + SETTINGS.navBarTravelDistance + "px)";
				}
				// We do want a transition (this is set in CSS) when moving so remove the class that would prevent that
				pnProductNavContents.classList.remove(
					"pn-ProductNav_Contents-no-transition"
				);
				// Update our settings
				SETTINGS.navBarTravelDirection = "left";
				SETTINGS.navBarTravelling = true;
			}
			// Now update the attribute in the DOM
			pnProductNav.setAttribute(
				"data-overflowing",
				determineOverflow(pnProductNavContents, pnProductNav)
			);
		});

		pnAdvancerRight.addEventListener("click", function() {
			// If in the middle of a move return
			if (SETTINGS.navBarTravelling === true) return;
			
			// If we have content overflowing both sides or on the right
			if (
				determineOverflow(pnProductNavContents, pnProductNav) === "right" ||
				determineOverflow(pnProductNavContents, pnProductNav) === "both"
			) {
				// Get the right edge of the container and content
				const navBarRightEdge = pnProductNavContents.getBoundingClientRect().right;
				const navBarScrollerRightEdge = pnProductNav.getBoundingClientRect().right;
				// Now we know how much space we have available to scroll
				const availableScrollRight = Math.floor(
					navBarRightEdge - navBarScrollerRightEdge
				);
				// If the space available is less than two lots of our desired distance, just move the whole amount
				// otherwise, move by the amount in the settings
				if (availableScrollRight < SETTINGS.navBarTravelDistance * 2) {
					pnProductNavContents.style.transform =
						"translateX(-" + availableScrollRight + "px)";
				} else {
					pnProductNavContents.style.transform =
						"translateX(-" + SETTINGS.navBarTravelDistance + "px)";
				}
				// We do want a transition (this is set in CSS) when moving so remove the class that would prevent that
				pnProductNavContents.classList.remove(
					"pn-ProductNav_Contents-no-transition"
				);
				// Update our settings
				SETTINGS.navBarTravelDirection = "right";
				SETTINGS.navBarTravelling = true;
			}
			// Now update the attribute in the DOM
			pnProductNav.setAttribute(
				"data-overflowing",
				determineOverflow(pnProductNavContents, pnProductNav)
			);
		});

		pnProductNavContents.addEventListener("transitionend", function() {
				// get the value of the transform, apply that to the current scroll position (so get the scroll pos first) and then remove the transform
				const styleOfTransform = window.getComputedStyle(
					pnProductNavContents,
					null
				);
				const tr =
					styleOfTransform.getPropertyValue("-webkit-transform") ||
					styleOfTransform.getPropertyValue("transform");
				// If there is no transition we want to default to 0 and not null
				const amount = Math.abs(parseInt(tr.split(",")[4]) || 0);
				pnProductNavContents.style.transform = "none";
				pnProductNavContents.classList.add(
					"pn-ProductNav_Contents-no-transition"
				);
				// Now lets set the scroll position
				if (SETTINGS.navBarTravelDirection === "left") {
					pnProductNav.scrollLeft = pnProductNav.scrollLeft - amount;
				} else {
					pnProductNav.scrollLeft = pnProductNav.scrollLeft + amount;
				}
				SETTINGS.navBarTravelling = false;
			},
			false
		);

		// Handle setting the currently active link
		pnProductNavContents.addEventListener("click", function(e) {
			const links = [].slice.call(
				document.querySelectorAll(".pn-ProductNav_Link")
			);
			links.forEach(function(item) {
				item.setAttribute("aria-selected", "false");
			});
			e.target.setAttribute("aria-selected", "true");
			// Pass the clicked item and it's colour to the move indicator function
			//	moveIndicator(e.target, colours[links.indexOf(e.target)]);
		});

		function determineOverflow(content, container) {
			//Container Position
            const containerMetrics = container.getBoundingClientRect();
			const containerMetricsRight = Math.floor(containerMetrics.right);
			const containerMetricsLeft = Math.floor(containerMetrics.left);
            //Content Position
			const contentMetrics = content.getBoundingClientRect();
			const contentMetricsRight = Math.floor(contentMetrics.right);
			const contentMetricsLeft = Math.floor(contentMetrics.left);
            let result = "none";

            //Check where content is situated
			if (
				containerMetricsLeft > contentMetricsLeft &&
				containerMetricsRight < contentMetricsRight
			) {
				result = "both";
			} else if (contentMetricsLeft < containerMetricsLeft) {
				result = "left";
			} else if (contentMetricsRight > containerMetricsRight) {
				result = "right";
			}

            return result
		}
	}
	render() {
		return (
			<div className="pn-ProductNav_Wrapper horiz-scroll-wrapper " ref={el => (this.el = el)}>
				<nav id="pnProductNav"
					className="pn-ProductNav horiz-scroll-outer dragscroll">
					<div id="pnProductNavContents"
						className="pn-ProductNav_Contents horiz-scroll-inner">
						{this.items}
						<span id="pnIndicator" className="pn-ProductNav_Indicator" />
					</div>
				</nav>
				<button id="pnAdvancerLeft" type="button">Left</button>
				<button id="pnAdvancerRight" type="button">Right</button>
			</div>
		);
	}
}

export default HorScroll;
