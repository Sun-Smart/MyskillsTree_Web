import { MultiFormComponent } from '../../../n-tire-bo-app/src/app/pages/layout/multiform/multiform.component';
import { entryformComponent } from '../../../n-tire-bo-app/src/app/pages/layout/entryform/entryform.component';


export const paths = [
    {
        path: '',
        children: [

            {
                path: '', component: MultiFormComponent,
                children: [
                    {
                        path: '', component: entryformComponent

                    },
                    {
                        path: ':id', component: entryformComponent,
                    }

                ]
            },
        ]
    },
];



export class NgMultiFormModule { }

