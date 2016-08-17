//import _debug from 'debug';
import AppBaseStore from '../AppBaseStore';

class HomeStore extends AppBaseStore {

    static storeName = 'HomeStore';

    static handlers = {
        LOAD_CONTENT: 'loadContent',
        INCREMENT_COUNT: 'incrementCount'
};

    constructor() {
        super();

        // Initial state
        this.state = {
            numSelected:0
        };
    }

    incrementCount(payload){
        console.log(payload);
        const num = this.state.numSelected;
        if(payload == 'card'){
            this.setState({numSelected: num +1})
        }else{
            this.setState({numSelected: num - 1})

        }

    }

    loadContent(){
        console.log("load content from store");
        this.setState({
            content:   [
            {
                image:'images/puppy.jpg',
                title:'Chocolate Lab',
                uploadedTime: '5 minutes ago'
            },{
                image:'images/puppy.jpg',
                title:'Chocolate Lab 2',
                uploadedTime: '5 minutes ago'
            },{
                image:'images/puppy.jpg',
                title:'Chocolate Lab 3',
                uploadedTime: '5 minutes ago'
            },{
                image:'images/puppy.jpg',
                title:'Chocolate Lab 4',
                uploadedTime: '5 minutes ago'
            },{
                image:'images/puppy.jpg',
                title:'Chocolate Lab 5',
                uploadedTime: '5 minutes ago'
            },{
                image:'images/puppy.jpg',
                title:'Chocolate Lab 6',
                uploadedTime: '5 minutes ago'
            },{
                image:'images/puppy.jpg',
                title:'Chocolate Lab 7',
                uploadedTime: '5 minutes ago'
            },{
                image:'images/puppy.jpg',
                title:'Chocolate Lab 8',
                uploadedTime: '5 minutes ago'
            },{
                image:'images/puppy.jpg',
                title:'Chocolate Lab 9',
                uploadedTime: '5 minutes ago'
            },{
                image:'images/puppy.jpg',
                title:'Chocolate Lab 10',
                uploadedTime: '5 minutes ago'
            },{
                image:'images/puppy.jpg',
                title:'Chocolate Lab 11',
                uploadedTime: '5 minutes ago'
            },{
                image:'images/puppy.jpg',
                title:'Chocolate Lab 12',
                uploadedTime: '5 minutes ago'
            },{
                image:'images/puppy.jpg',
                title:'Chocolate Lab 13',
                uploadedTime: '5 minutes ago'
            }
        ]
    });

  }
}

export default HomeStore;
