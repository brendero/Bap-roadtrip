import * as moment from 'moment';
import { Moment, MomentInput } from 'moment';

let momentObj = moment;
if ('default' in moment) {
	momentObj = moment['default'];
}

format = (value, format = 'DD/MM/YYYY') => (
	momentObj(value).format(format)
)

export default format;
