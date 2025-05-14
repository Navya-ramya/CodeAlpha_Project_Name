document.addEventListener("DOMContentLoaded", function () {
	const contributionAmountInput = 
		document.getElementById("contribution-amount");
	const contributeButton = 
		document.getElementById("contribute-button");
	const totalAmount = 
		document.getElementById("total-amount");
	const progressBar = 
		document.getElementById("progress-bar");
	const projectDetails = 
		document.querySelector(".project-details"); 
	// Use querySelector to get 
	// the first element with the class

	const goalAmount = 1000;
	let totalRaised = 100;

	contributeButton.addEventListener("click", function () {
		if (totalRaised >= goalAmount) {
			alert("Thank You! Goal Already Reached!");
			return;
		}

		const amount = 
			parseFloat(contributionAmountInput.value);

		if (!isNaN(amount) && amount > 0) {
			if (totalRaised + amount > goalAmount) {
				alert(`Thank you for contributing, 
					but we need $${goalAmount - totalRaised} 
					only, so please contribute only 
					$${goalAmount - totalRaised}.`);
			} else {
				totalRaised += amount;
				totalAmount.textContent = 
					`$${totalRaised.toFixed(2)}`;
				contributionAmountInput.value = "";
				updateProgressBar();

				if (totalRaised >= goalAmount) {
					projectDetails.innerHTML = 
						`<h3>Thank You for Contributing</h3> 
						The goal has been reached!`;
					// Remove the contribute button
					contributeButton.style.display = "none";
				} else {
					alert(`Thank you for contributing $${amount}!`);
				}
			}
		} else {
			alert("Please enter a valid contribution amount.");
		}
	});

	// Function to update the progress bar
	function updateProgressBar() {
		const progress = (totalRaised / goalAmount) * 100;
		progressBar.style.width = progress + "%";
	}
});