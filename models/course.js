const { v4: uuidv4 } = require('uuid')
const fs = require('fs').promises
const path = require('path')

class Course {
    constructor(title, price, image) {
        this.title = title
        this.price = price
        this.image = image
        this.id = uuidv4()
    }

    toJSON() {
        return {
            title: this.title,
            price: this.price,
            image: this.image,
            id: this.id
        }
    }

    async save() {
        const courses = await Course.getAll()
        courses.push(this.toJSON())

        await fs.writeFile(
            path.join(__dirname, '..', 'data', 'courses.json'),
            JSON.stringify(courses)
        )
    }

    static async getAll() {
        try {
            const content = await fs.readFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                'utf-8'
            )
            return JSON.parse(content)
        } catch (e) {
            console.error(e)
        }
    }

    static async getById(id) {
        const courses = await Course.getAll()

        try {
            return courses.find(course => course.id === id)
        } catch (e) {
            console.error(e)
        }

    }
}

module.exports = Course