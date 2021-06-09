import _ from 'lodash'

import React, { Component } from 'react'
import { Container, Header, Button, Checkbox, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Gallery from 'react-photo-gallery'
import Lightbox from 'react-image-lightbox'

class Main extends Component {

    componentDidMount() {

    }

    render() {
        const background = 'url(/images/main-image.jpg)'

        return (
            <div>
                <div className='section-header' style={{backgroundImage: background}}>
                    <Container className='main-header'>
                        <Header as='h1' inverted>Астровыезды с телескопами под звездное небо</Header>
                        <p>Станьте участником одного из крутых мероприятий Оренбургской области - экскурсии под ночное звездное небо.
                            На астровыезде можно послушать интересные рассказы о нашей Вселенной, звездах, планетах, а также узнать как можно путешествовать во времени - все только с научной точки зрения.
                            Заглянуть в глубины космоса с помощью самых разных телескопов, сделать астрофотографии планет нашей Солнечной системы и пообщаться с такими же увлеченными людьми - это все можно сделать на <b>астровыезде</b>.
                        </p>
                    </Container>
                </div>
                <div className='section-form'>
                    <Container>
                        <Header as='h2' inverted>Записаться на астровыезд</Header>
                        <Form inverted>
                            <Form.Field>
                                <label>Как Вас зовут?</label>
                                <input placeholder='Ваше имя' />
                            </Form.Field>
                            <Form.Field>
                                <label>Укажите телефон для связи</label>
                                <input placeholder='Контактный телефон' />
                            </Form.Field>
                            <Form.Field>
                                <label>Сколько будет человек?</label>
                                <input placeholder='Количество человек' />
                            </Form.Field>
                            <Form.Field>
                                <Checkbox label='Отправляя данные, вы соглашаетесь с политикой конфиденциальности' />
                            </Form.Field>
                            <Button type='submit' color='blue'>Записаться</Button>
                        </Form>
                    </Container>
                </div>
                <div className='section-photo'>
                    <Container>
                        <Header as='h2' inverted>Как проходят астровыезды</Header>
                        <Gallery
                            photos={[]}
                        />
                    </Container>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps)(Main)