import { h, Component, render } from 'preact';
import MainMenu from './components/MainMenu';
import { APIList, API } from './components/APIList';
import ScrollToTop from './components/ScrollToTop';
import Modal from './components/Modal';

import './styles/index.scss';

const infoModalText =
	(
		<p>
			This site is made with <a href="https://preactjs.com/">Preact</a>,
			using the <a href="https://github.com/toddmotto/public-apis">API of public APIs</a>.
	<br />
			Source code is available <a href="https://github.com/JBuma/Api-Api">here</a>.
	</p>);

interface MainState {
	// queryString: string;
	Apis: { count: number, entries: API[] };
}

export default class Index extends Component<{}, MainState> {
	private baseUrl: string = 'https://api.publicapis.org/';
	public modal: any;
	constructor(props: {}) {
		super(props);
		this.modal = null;
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
	public toggleModal = () => {
		this.modal.toggleModal();
	}
	private queryStringCallback = (queryString: string) => {
		this.fetchApis(this.baseUrl + queryString);
	}

	private fetchApis = (url: string) => {
		fetch(url)
			.then((res) => {
				if (res.status === 200) {
					return res.json();
				}
			})
			.then((res) => {
				this.setState({
					Apis: res,
				});
			})
			.catch((err) => {
				console.error(err);
			});
	}
	public componentDidMount() {
		this.fetchApis(this.baseUrl + 'entries');
	}
	public render() {
		return (
			<main className="main">
				<Modal onRef={(ref) => (this.modal = ref)} title="Info" content={infoModalText} />
				<MainMenu openInfoModal={this.toggleModal} QueryStringCallback={this.queryStringCallback} />
				<APIList ApiList={this.state.Apis} />
				<ScrollToTop topSelector="main-menu" />
			</main>
		);
	}
}

render(
	<Index />, document.getElementById('app') as Element);
