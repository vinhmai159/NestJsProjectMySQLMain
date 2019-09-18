import { plainToClass, ClassTransformOptions } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';

export abstract class Mapper {
    static toEntities<T, V extends Array<any>>(cls: ClassType<T>, plain: V, options?: ClassTransformOptions): T[] {
        return plainToClass(cls, plain, options);
    }

    static toEntity<T, V>(cls: ClassType<T>, plain: V, options?: ClassTransformOptions): T {
        return plainToClass(cls, plain, options);
    }

    static toDtos<T, V extends Array<any>>(cls: ClassType<T>, plain: V, option?): T[] {
        if (!option) {
            option = { strategy: 'excludeAll' };
        }
        return plainToClass(cls, plain, option);
    }

    static toDto<T, V>(cls: ClassType<T>, plain: V, option?): T {
        if (!option) {
            option = { strategy: 'excludeAll' };
        }
        return plainToClass(cls, plain, option);
    }
}
