import { h, Component } from 'preact';

interface CategorySelectorState {
	categories: string[];
	selectedCategory: string;
}
interface CategorySelectorProps {
	queryOption: string;
	onChange: (e: any, parameter: string) => void;
}

export default class CategorySelector extends Component<CategorySelectorProps, CategorySelectorState> {
	// TODO: Make the base url global
	private baseUrl = 'https://api.publicapis.org/';
	constructor(props: CategorySelectorProps) {
		super(props);
		this.state = {
			categories: ['All'],
			selectedCategory: 'All',
		};
	}
	public componentDidMount() {
		fetch(this.baseUrl + 'categories')
			.then((res) => {
				// console.log('first:', res);
				return res.json();
			})
			.then((res) => {

				const state: string[] = ['All'];
				state.concat(...res);
				// console.log(state);
				this.setState({
					categories: state.concat(res),
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}
	private handleChange = (e: any) => {
		this.setState({ selectedCategory: e.target.value });
		console.log(this.state.selectedCategory);
	}
	public render() {
		const categories: JSX.Element[] = this.state.categories.map((category) => {
			return (
				<option key={category} value={category}>{category}</option>
			);
		});
		return (
			<div className="form-group">
				<label for="category-select">Categories</label>
				<select onChange={(e: Event) => { this.props.onChange(e, this.props.queryOption); }} name="category-select" id="">
					{categories}
				</select>
			</div>
		);
	}
}
