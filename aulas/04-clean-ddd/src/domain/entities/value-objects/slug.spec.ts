import { Slug } from "./slug";

test('it should be able to create a new slug from text', () => {
    const slug = Slug.createFromText("this a example for slug-")

    expect(slug.value).toEqual("this-a-example-for-slug")
})