import {
    $$,
    reRender
} from "../untils";
import categoryAPI from "../api/categoryAPI";
const ListCategoryChild = {
    async render() {
        const {
            data: cate
        } = await categoryAPI.list();
        const result = cate.map((element, index) => {
            return /*html */ `
            <tr>
            <td>${index+1}</td>
            <td>${element.name}</td>
            <td class="w-20"><button
            class=" bg-gradient-to-r from-green-400 to-blue-500  text-white rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center"><a
                href="#/editcategory/${element.id}"
                class="inline-block py-2 px-3"><i class="far fa-edit"></i></a></button></td>
              <td class="w-20"><button data-id="${element.id}"
            class="list-category-btn bg-gradient-to-r from-purple-200 via-pink-500 to-red-500 text-white rounded-lg  transition duration-300 ease-in-out transform hover:scale-105">
                <i class="far fa-trash-alt inline-block px-3 py-[13px]"></i></button></td>
            </tr>
            `;
        }).join("");
        return /*html */ `
            <table class="table text-center" id="table-category">
                                 <thead class=" text-primary">
                                        <th>
                                            stt
                                        </th>
                                        <th>Name Category</th>
                                        <td colspan="2" class="w-32">Custom</td>
                                 </thead>
                                    <tbody>
                                        ${result}
                                    </tbody>
            </table>
        `;
    },
    async afterRender() {
        const btns = $$('.list-category-btn')
        btns.forEach(element => {
            const id = element.dataset.id;
            element.addEventListener('click', async () => {
                const question = confirm('Are you want to delete?');
                if (question) {
                    await categoryAPI.remove(id);
                    await reRender(ListCategoryChild, '#table-category');
                }
            });
        });
    }
}
export default ListCategoryChild;