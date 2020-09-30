import React, { Component } from 'react';
import { Button,Col, Row, Input, message, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import '@ant-design/compatible/assets/index.css';
import { LeftCircleOutlined, RightCircleOutlined   } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import * as GiftcardAPI from '../api/Giftcard';
import { RESPONSE_CODES } from '../constants/API';
import { range  } from 'lodash';
import ReactDOM from "react-dom";
import MyWidget from '../widget';
import './style.css';
import ItemsCarousel from 'react-items-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";

let MyWidget1 = MyWidget.driver('react',{
   React: React,
   ReactDOM: ReactDOM
})

const FormItem = Form.Item;
const {TextArea} = Input;

const fields = {
  name: 'name',
  email: 'email',
  isGift: 'isGift',
  agreetos: 'agreetos',
  recipient_name: 'recipient_name',
  recipient_email: 'recipient_email',
  message: 'message',
  quantity: 'quantity',
  delivery_method: 'delivery_method'
};

class PurchaseGiftCard extends Component {

	constructor(props) {
    	super(props);
	    this.state = {
	      loading: false,
	      loadingPromo: false,
	      promo_code: null,
	      discounted_amount: 0,
	      value: 0,
	      product_image: "",
	      children: [],
	      activeItemIndex: -1,
	      images: ['giftcard.png', 'gc1.png', 'gc2.png', 'gc3.png', 'gc4.png']
	    }
	}

	onChange = value => {
    	this.setState({
      		value: value,
    	});
  	};

	componentDidMount() {
		setTimeout(() => {
	    	this.setState({
	      	  children: this.createChildren(this.state.images.length),
	      	})
	    }, 100);

	    if (window.xprops) {
	    	let imgs = window.xprops.image_url;
	    	  this.setState({
		    	product_image: imgs ? imgs : "https://via.placeholder.com/150"
	      	});
	    }
	}

  	createChildren = n => range(n).map(i => <div key={i} style={{ height: 100, textAlign: "center" , cursor: 'pointer'}}><img alt='' style={{ height: 100 }} src={require('../assets/img/' + this.state.images[i])} onClick={e => this.setActiveItem(i)} /></div>);

  	changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

  	setActiveItem = (index) => {
	    this.setState({
	      activeItemIndex: index,
	    });
  	};

	handleSubmit = (e) => {
		e.preventDefault();
	    this.props.form.validateFields((error, values) => {
	      if (!error) {
	        let options = {
	          sender_name: values.name,
	          sender_email: values.email,
	          recipient_name: values.recipient_name,
	          recipient_email: values.recipient_email,
	          message: values.message,
	          imgUrl: this.state.product_image
	        }

	        GiftcardAPI.sendEmail(options)
	        .then(result => {
	          if (result.code === RESPONSE_CODES.SUCCESS) {
	            this.setState({ balance: result.data.balance });
	          } else {
	            message.error(result.message);
	          }
	        })
	        .catch((e) => {
	          console.log(e)
	        });
	      }
	    })
	}
	
	render() {
		const {
	      activeItemIndex,
	      children,
	      images
	    } = this.state;
		const { isFieldsTouched, getFieldDecorator, getFieldValue } = this.props.form;
		const { store } = {
			app_id: "4dk8uwhtd1qx3h918q81ei5jvjq65yf",
			currency: "United States Dollar",
			currency_short: "USD",
			currency_symbol: "$",
			default_image_url: "https://development-doboz-assets.s3-ap-southeast-1.amazonaws.com/in/giftcards/styles/4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce/medium_rectangle_default-8b6a72aafb42c0dd21.png",
			default_sender_email: "rachel@doboz.co",
			default_sender_name: "Test",
			domain: "doboz.mybigcommerce.com",
			max_card_amount: 1000,
			min_card_amount: 10,
			promotion: {},
			store_name: "doboz",
			store_url: "https://doboz.mybigcommerce.com",
		};
	
		return(
			<div>
				<Row gutter={0} justify={'center'} style={{textAlign: "center", marginTop: 10}} >
					<Col xs={24} sm={24} md={24}>
						<div>

						<h2>Doboz Gift card</h2>
							
						</div>
					</Col>
				</Row>
				<Row gutter={0} className={'gx-mt-4'} justify={'center'} >
					<Col xs={24} sm={6} md={6} style={{textAlign: "center", marginTop: 0}}>
						<div>
						  <div className="box">
					          <div className="box-body">
								<img alt='' className="img img-example"  src={this.state.activeItemIndex !== -1 ? require('../assets/img/' + images[activeItemIndex]) : this.state.product_image}s />
					            <div className="box-lid">
					              <div className="box-bowtie"></div>
					            </div>
					          </div>
					        </div>
						</div>
					</Col>
					<Col xs={24} sm={14} md={14} offset={2}>
						<Row gutter={8} type="flex">
							<Col xs={8} style={{margin: "auto", textAlign: "center"}}>
								<p>Select your design</p>
							</Col>
							<Col xs={15}>
								<ItemsCarousel
						        // Placeholder configurations
						        enablePlaceholder ={false}

						        // Carousel configurations
						        numberOfCards={3}
						        gutter={12}
						        showSlither={false}
						        firstAndLastGutter={true}
						        freeScrolling={false}

						        // Active item configurations
						        requestToChangeActive={this.changeActiveItem}
						        activeItemIndex={activeItemIndex}
						        activePosition={'center'}

						        chevronWidth={4}
						        rightChevron={<RightCircleOutlined />}
						        leftChevron={<LeftCircleOutlined />}
						        outsideChevron={true}
						      >
						        {children}
						      </ItemsCarousel>
							</Col>
							<Col xs={1}>
							</Col>
						</Row>
						<Form
			              style={{marginTop: 10}}
			              layout="vertical"
			              onSubmit={this.handleSubmit}
			            >
			             
			              <Row gutter={8} type="flex">
			                <Col flex={1}>
			                  <FormItem>
			                    {getFieldDecorator(fields.name, {
			                      rules: [{ required: true, message: 'Please input your name'}],
			                      initialValue: this.props.isCustomerLoggedIn ? ((this.props.profile.first_name || this.props.profile.last_name) ? `${this.props.profile.first_name} ${this.props.profile.last_name}` : null) : null
			                    })(
			                      <Input allowClear 
			                        placeholder="Your name" />
			                    )}
			                  </FormItem>
			                </Col>
			                <Col flex={1}>
			                  <FormItem>
			                    {getFieldDecorator(fields.email, {
			                      rules: [{ required: true, message: 'Please input your email'}, { type: 'email', message: 'Invalid email' }],
			                      initialValue: this.props.isCustomerLoggedIn ? (this.props.profile.email || null) : null
			                    })(
			                      <Input allowClear 
			                        placeholder="Your email" />
			                    )}
			                  </FormItem>
			                </Col>
			              </Row>
			             
			                <React.Fragment>
			                  <Row gutter={8} type="flex">
			                    <Col flex={1}>
			                      <FormItem>
			                        {getFieldDecorator(fields.recipient_name, {
			                          rules: [{ required: getFieldValue('isGift'), message: 'Please input recipient email'}],
			                        })(
			                          <Input allowClear 
			                            placeholder="Recipient Name" />
			                        )}
			                      </FormItem>
			                    </Col>
			                    <Col flex={1}>
			                      <FormItem>
			                        {getFieldDecorator(fields.recipient_email, {
			                          rules: [{ required: getFieldValue('isGift'), message: 'Please input recipient email'}, { type: 'email', message: 'Invalid email' }],
			                        })(
			                          <Input allowClear 
			                            placeholder="Recipient Email" />
			                        )}
			                      </FormItem>
			                      </Col>
			                  </Row>
			                  <FormItem>
			                    {getFieldDecorator(fields.message, {
			                      rules: []
			                    })(
			                      <TextArea rows={3} onChange={this.handleChangeText} allowClear
			                        placeholder="Custom message..." />
			                    )}
			                  </FormItem>
			                </React.Fragment>
			              <FormItem>
			                {getFieldDecorator(fields.agreetos, {
			                  rules: [{ required: true, message: 'Please agree to terms of service' }],
			                  valuePropName: 'checked',
			                  initialValue: undefined
			                })(
			                  <Checkbox>I agree that Gift Certificates are non-refundable.</Checkbox>
			                )}
			              </FormItem>
			              <Row justify={'center'}>
			                <FormItem>
			                  <Button
			                    type="primary"
			                    size={"large"}
			                    htmlType="submit"
			                  >
			                    Add to cart
			                  </Button>
			                </FormItem>
			              </Row>
			            </Form>
					</Col>
				</Row>
			</div>
		);
	}
}

export default Form.create()(PurchaseGiftCard);