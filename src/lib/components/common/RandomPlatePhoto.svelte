<script>
	import breakfastOne from '$lib/assets/plates/breakfast1.png';
	import breakfastTwo from '$lib/assets/plates/breakfast2.png';
	import breakfastThree from '$lib/assets/plates/breakfast3.png';
	import breakfastFour from '$lib/assets/plates/breakfast4.png';
	import breakfastFive from '$lib/assets/plates/breakfast5.png';
	import breakfastSix from '$lib/assets/plates/breakfast6.png';

	import lunchOne from '$lib/assets/plates/lunch1.png';
	import lunchTwo from '$lib/assets/plates/lunch2.png';
	import lunchThree from '$lib/assets/plates/lunch3.png';
	import lunchFour from '$lib/assets/plates/lunch4.png';
	import lunchFive from '$lib/assets/plates/lunch5.png';
	import lunchSix from '$lib/assets/plates/lunch6.png';

	import dinnerOne from '$lib/assets/plates/dinner1.png';
	import dinnerTwo from '$lib/assets/plates/dinner2.png';
	import dinnerThree from '$lib/assets/plates/dinner3.png';
	import dinnerFour from '$lib/assets/plates/dinner4.png';
	import dinnerFive from '$lib/assets/plates/dinner5.png';
	import dinnerSix from '$lib/assets/plates/dinner6.png';

	export const plates = [
		{
			title: 'Breakfast',
			images: [
				breakfastOne,
				breakfastTwo,
				breakfastThree,
				breakfastFour,
				breakfastFive,
				breakfastSix
			]
		},
		{
			title: 'Lunch',
			images: [lunchOne, lunchTwo, lunchThree, lunchFour, lunchFive, lunchSix]
		},
		{
			title: 'Dinner',
			images: [dinnerOne, dinnerTwo, dinnerThree, dinnerFour, dinnerFive, dinnerSix]
		}
	];

	export const allPlates = [
		breakfastOne,
		breakfastTwo,
		breakfastThree,
		breakfastFour,
		breakfastFive,
		breakfastSix,
		lunchOne,
		lunchTwo,
		lunchThree,
		lunchFour,
		lunchFive,
		lunchSix,
		dinnerOne,
		dinnerTwo,
		dinnerThree,
		dinnerFour,
		dinnerFive,
		dinnerSix
	];

	export function getRandomPlate() {
		const randomIndex = Math.floor(Math.random() * allPlates.length);
		return allPlates[randomIndex];
	}
</script>

<img src={getRandomPlate()} alt="plate" />
