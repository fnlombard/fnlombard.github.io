interface ComponentConfigOptions {
    min_width_rem: number;
    max_width_rem: number;
}

export class ComponentConfig {
    readonly min_width_rem: number;
    readonly max_width_rem: number;

    constructor(options: ComponentConfigOptions) {
        this.min_width_rem = options.min_width_rem;
        this.max_width_rem = options.max_width_rem;
        Object.freeze(this);
    }

    static default(): ComponentConfig {
        return new ComponentConfig({
            min_width_rem: 24,
            max_width_rem: 64,
        });
    }
}