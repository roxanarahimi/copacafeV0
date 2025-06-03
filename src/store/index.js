import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
    state: {
        panelUrl: 'https://panel.copacaffee.webagent.ir',
        slides: null,
        productsCats: null,
    },
    mutations: {
        setSlides(state, slides) {
            state.slides = slides;
        },
        setProductCats(state, categories) {
            state.productsCats = categories;
        }
    },
    actions: {
        async getSlides({ commit, state }) {
            try {
                const response = await axios.get(state.panelUrl + '/api/slide');
                commit('setSlides', response.data);
            } catch (error) {
                console.error('Error loading slides:', error);
            }
        },
        async getProductCats({ commit, state }) {
            try {
                const response = await axios.get(state.panelUrl + '/api/category/product');
                commit('setProductCats', response.data);
            } catch (error) {
                console.error('Error loading product categories:', error);
            }
        }
    }
});
