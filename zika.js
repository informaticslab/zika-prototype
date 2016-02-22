$(document).ready(function() {

	//hide all results divs
	$("#results").hide();
	$(".hcresults").hide();

	//Do this when Calculate button is clicked	
	$("#calc").click(function() {

		$("#calc_form").hide();
		$("#results").show();
		$(".hcresults").show();

		//get value for sex
		var sex = $("#genderForm input[name=gender_select]:checked").val();
		//get value for age_month
		var ageMonth = $("select[name=age_select]").val();
		//get value for head circumference
		var headCircumference = $("input[name=circumference]").val();

		var maleTable = [
			[0, [
				[31.48762, 3],
				[32.14881, 5],
				[33.08389, 10],
				[34.46952, 25],
				[35.81367, 50],
				[37.00426, 75],
				[37.97379, 90],
				[38.51574, 95],
				[38.85417, 97]
			]],
			[1, [
				[33.25006, 3],
				[33.83392, 5],
				[34.67253, 10],
				[35.93987, 25],
				[37.19361, 50],
				[38.32125, 75],
				[39.24989, 90],
				[39.77262, 95],
				[40.10028, 97]
			]],
			[2, [
				[35.78126, 3],
				[36.26428, 5],
				[36.97377, 10],
				[38.07878, 25],
				[39.20743, 50],
				[40.24987, 75],
				[41.12605, 90],
				[41.62581, 95],
				[41.94138, 97]
			]],
			[3, [
				[37.5588, 3],
				[37.97959, 5],
				[38.60724, 10],
				[39.60637, 25],
				[40.65233, 50],
				[41.63968, 75],
				[42.48436, 90],
				[42.97189, 95],
				[43.28181, 97]
			]]
		];

		var femaleTable = [
			[0, [
				[31.9302, 3],
				[32.2509, 5],
				[32.75949, 10],
				[33.65187, 25],
				[34.71156, 50],
				[35.85124, 75],
				[36.9535, 90],
				[37.65138, 95],
				[38.1211, 97]
			]],
			[1, [
				[33.38071, 3],
				[33.68744, 5],
				[34.17346, 10],
				[35.02508, 25],
				[36.03454, 50],
				[37.11807, 75],
				[38.16405, 90],
				[38.82535, 95],
				[39.27006, 97]
			]],
			[2, [
				[35.48627, 3],
				[35.7756, 5],
				[36.23326, 10],
				[37.03282, 25],
				[37.97672, 50],
				[38.98533, 75],
				[39.95459, 90],
				[40.56517, 95],
				[40.97482, 97]
			]],
			[3, [
				[36.9855, 3],
				[37.26522, 5],
				[37.70685, 10],
				[38.47603, 25],
				[39.38013, 50],
				[40.34145, 75],
				[41.26063, 90],
				[41.83732, 95],
				[42.22321, 97]
			]]
		];

		var getArrayByAge = function(table, age) {
			for (var i = 0; i < table.length; i++) {
				if (table[i][0] == age) {
					return table[i][1];
				}
			}
		};

		var getNearestValues = function(array, value) {

			var getPercentilePair = function(lo, hi, val) {
				var loDiff, hiDiff, closestVal;
				if (lo != undefined) {
					loDiff = Math.abs(lo[0] - val);
				} else {
					loDiff = -1;
				}

				if (hi != undefined) {
					hiDiff = Math.abs(hi[0] - val);
				} else {
					hiDiff = -1;
				}

				console.log(loDiff);
				console.log(hiDiff);
				if (loDiff == -1) {
					return hi;
				} else if (hiDiff == -1) {
					return lo;
				} else if (loDiff < hiDiff) {
					return lo;
				} else if (hiDiff <= loDiff) {
					return hi;
				}
			};

			var lo = -1,
				hi = array.length;
			while (hi - lo > 1) {
				var mid = Math.round((lo + hi) / 2);
				if (array[mid][0] <= value) {
					lo = mid;
				} else {
					hi = mid;
				}
			}
			if (array[lo] == value) hi = lo;
			var loValue = array[lo];
			var hiValue = array[hi];

			console.log(loValue);
			console.log(hiValue);
			var nearestValue = getPercentilePair(loValue, hiValue, value);
			console.log(nearestValue);
			return nearestValue;
		};


		if (sex === "Male") {
			var usableArray = getArrayByAge(maleTable, ageMonth);
		} else {
			var usableArray = getArrayByAge(femaleTable, ageMonth);
		}



		var percentile = getNearestValues(usableArray, headCircumference);
		percentile = percentile[1];
		console.log(percentile);


		//RESULTS SECTION

		$(".sResults").empty().append("Sex: " + sex);
		$(".aResults").empty().append("Age: " + ageMonth + " month (s)");
		$(".cResults").empty().append("Head Circumference: " + headCircumference + " cm");
		$(".percentile").empty().append(percentile + "th Percentile");

		//severe
		if (percentile >= 3 && percentile <= 25) {
			$(".hcresults").hide();
			$("#severe").show();
			//mild
		} else if (percentile >= 50 && percentile <= 75) {

			$(".hcresults").hide();
			$("#mild").show();
			//normal
		} else if (percentile >= 90) {
			$(".hcresults").hide();
			$("#normal").show();
		} else {
			//error
			$(".hcresults").hide();
			$("#error").show();
			$("#bmi_table").hide();

		}
		//RESULTS SECTION END
	});

	$("#reset").click(function() {
		$("#calc_form").show();
		$("#results").hide();
		$(".hcresults").hide();
		$("input[name=circumference]").val("");
		$("select[name=age_select]").val(0);
		$("#genderForm input[name=gender_select]:checked").attr("checked", false);
	});

});