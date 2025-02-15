const Events = require('../../api/v1/events/model')
const { checkingImage } = require('./images')
const { checkingCategories } = require('./categories')
const { checkingTalents } = require('./talents')

const { NotFoundError, BadRequestError } = require('../../errors')

const getAllEvents = async(req) => {
    const { keyword, category, talent } = req.query

    let condition = {}

    if(keyword){
        condition = { ...condition, title: { $regex: keyword, $options: 'i'}}
    }

    if(category){
        condition = { ...condition, category: { $regex: keyword, $options: 'i'}}
    }

    if(talent){
        condition = { ...condition, talent: { $regex: keyword, $options: 'i'}}
    }

    const result = await Events.find(condition)
    .populate({ path: 'image', select: '_id name'})
    .populate({
        path: 'category',
        select: '_id name'
    })
    .populate({
        path: 'talent',
        select: '_id name role image',
        populate: { path: 'image', select: '_id name'}
    })

    return result
}

const createEvents = async(req) => {
    const { title, date, about, tagline, venueName, keyPoint, statusEvent, tickets, image, category, talent} = req.body

    await checkingImage(image)
    await checkingCategories(category)
    await checkingTalents(talent)

    const check = await Events.findOne({ title })

    if(check) throw new BadRequestError('event dengan nama yang sama masih ada')

    const result = await Events.create({
        title,
        date,
        about,
        tagline,
        venueName,
        keyPoint,
        statusEvent,
        tickets,
        image,
        category,
        talent
    })

    return result
}

const getOneEvents = async(req) => {
    const { id } = req.params

    const result = await Events.findOne({ _id: id })
    .populate({ path: 'image', select: '_id name'})
    .populate({
        path: 'category',
        select: '_id name'
    })
    .populate({
        path: 'talent',
        select: '_id name role image',
        populate: { path: 'image', select: '_id name'}
    })

    if(!result) throw new NotFoundError(`Tidak ada talent dengan id : ${id}`)
    
    return result
}

const updateEvents = async(req) => {
    const { id } = req.params

    const { title,
        date,
        about,
        tagline,
        venueName,
        keyPoint,
        statusEvent,
        tickets,
        image,
        category,
        talent
    } = req.body

    await checkingImage(image)
    await checkingCategories(category)
    await checkingTalents(talent)

    const checkEvent = await Events.findOne({
        _id: id
    })

    if(!checkEvent) throw new NotFoundError(`Tidak ada event dengan id: ${id}`)

    const check = await Events.findOne({
        title,
        _id: { $ne: id}
    })

    if(check) throw new BadRequestError('Judul event sudah dipakai')
    
    const result = await Events.findOneAndUpdate(
        {
            _id: id
        },
        {
            title,
            date,
            about,
            tagline,
            venueName,
            keyPoint,
            statusEvent,
            tickets,
            image,
            category,
            talent
        },
        { $ne: true, runValidators: true}
    )

    return result
}

const deleteEvents = async(req) => {
    const { id } = req.params

    const result = await Events.findOne({
        _id: id
    })

    if(!result) throw new NotFoundError(`Tidak ada pembicara dengan id: ${id}`)

    await result.deleteOne()

    return result
}

module.exports = {
    getAllEvents,
    createEvents,
    getOneEvents,
    updateEvents,
    deleteEvents
}