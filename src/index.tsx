import { h, Component, render } from 'preact';
import MainMenu from './components/MainMenu';
import { APIList, API } from './components/APIList';

import './styles/index.scss';

interface MainState {
	// queryString: string;
	Apis: { count: number, entries: API[] };
}

export default class Index extends Component<{}, MainState> {
	private baseUrl: string = 'https://api.publicapis.org/';
	constructor(props: {}) {
		super(props);
		// Placeholders TODO: remove
		const entries = [];
		const count = 20;
		for (let i = 0; i < count; i++) {
			entries.push({
				API: 'Cats',
				Description: 'Pictures of cats from Tumblr',
				Auth: '',
				HTTPS: true,
				Cors: 'unknown',
				Link: 'https://thecatapi.com/docs.html?blahblah=' + i,
				Category: 'Animals',
			});
		}
		this.state = {
			Apis: {
				count,
				entries,

			},
		};
	}
	private queryStringCallback = (queryString: string) => {
		this.fetchApis(this.baseUrl + queryString);
	}
	private fetchApis = (url: string) => {
		// console.log(url);
		fetch(url)
			.then((res) => {
				if (res.status === 200) {
					return res.json();
				}
			})
			.then((res) => {
				console.log('Response:', res);
				// this.setState({
				// 	Apis: {
				// 		count: 0,
				// 		entries: [],
				// 	},
				// });
				this.setState({
					Apis: res,
				});
			})
			.catch((err) => {
				console.error(err);
			});
	}
	public componentDidMount() {
		// this.fetchApis(this.baseUrl + 'entries');
	}
	public render() {
		return (
			<main className="main">
				<MainMenu QueryStringCallback={this.queryStringCallback} />
				<APIList ApiList={this.state.Apis} />
			</main>
		);
	}
}

render(
	<Index />, document.getElementById('app') as Element);
