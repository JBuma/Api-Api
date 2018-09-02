import { h, Component } from 'preact';
import CategorySelector from './Menu/CategorySelector';
import AuthSelector from './Menu/AuthSelector';
import CorsSelector from './Menu/CorsSelector';
import HttpsSelector from './Menu/HttpsSelector';
import StringSelector from './Menu/StringSelector';

import '../styles/_main-menu.scss';

interface MainMenuProps {
	QueryStringCallback: (queryString: string) => void;
}
interface QueryOptions extends Object {
	category: string;
	title: string | null;
	description: string | null;
	https: boolean | null | 'Any';
	cors: 'yes' | 'no' | 'unknown' | 'Any';
	auth: 'OAuth' | 'X-Mashape-Key' | 'apiKey' | 'Any';
	[key: string]: any;
}
interface MainMenuState {
	queryOptions: QueryOptions;
	APIList: {};
}

export default class MainMenu extends Component<MainMenuProps, MainMenuState> {
	private baseUrl = 'https://api.publicapis.org/entries';
	constructor(props: MainMenuProps) {
		super(props);
		this.state = {
			queryOptions: {
				category: 'All',
				title: null,
				description: null,
				https: 'Any',
				cors: 'Any',
				auth: 'Any',
			},
			APIList: {},
		};
	}
	private searchApis = () => {
		this.props.QueryStringCallback(this.getQueryString(this.state.queryOptions));
	}
	private convertToSearchableString = (query: string): string => {
		return query.split(' ')[0];
	}
	private getQueryString = (queryOptions: QueryOptions): string => {
		// return '';
		const category = queryOptions.category === 'All' ? '' : `category=${queryOptions.category}`;
		const auth = queryOptions.auth === 'Any' ? '' : `&auth=${queryOptions.auth}`;
		const cors = queryOptions.cors === 'Any' ? '' : `&cors=${queryOptions.cors}`;
		const https = queryOptions.https === 'Any' ? '' : `&https=${queryOptions.https}`;
		const title = queryOptions.title === '' ? '' : `&title=${queryOptions.title}`;
		const description = queryOptions.title === '' ? '' : `&description=${queryOptions.title}`;
		return `entries?${category}${auth}${cors}${https}${title}${description}`;
	}
	private handleParameterChange = (e: any, parameter: string) => {
		const queryOptions = this.state.queryOptions;
		queryOptions[parameter] = this.convertToSearchableString(e.target.value);
		this.setState({
			queryOptions,
		});
	}
	public render() {
		return (
			<menu className="main-menu">
				<h1>Menu</h1>
				<StringSelector queryOption="title" onChange={this.handleParameterChange} />
				<CategorySelector queryOption="category" onChange={this.handleParameterChange} />
				<AuthSelector queryOption="auth" onChange={this.handleParameterChange} />
				<CorsSelector queryOption="cors" onChange={this.handleParameterChange} />
				<HttpsSelector queryOption="https" onChange={this.handleParameterChange} />
				<button onClick={this.searchApis} id="search-apis">Search</button>
			</menu>
		);
	}
}
